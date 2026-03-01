import { useEffect, useState } from 'react';
import { GLTFLoader } from 'three-stdlib';
import { supabase } from '../services/supabase';
import { openDB } from 'idb';

const CACHE_DB_NAME = 'arModelsCache';
const CACHE_STORE_NAME = 'models';
const CACHE_SIZE_LIMIT = 50 * 1024 * 1024; // 50MB limit
const MODEL_LOAD_TIMEOUT = 10000; // 10 seconds

export const useModel3D = (modelId: string | null, modelFilePath: string | null) => {
  const [model, setModel] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!modelId || !modelFilePath) {
      setModel(null);
      return;
    }

    const loadModel = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // 1. Try to load from IndexedDB cache
        let modelData: ArrayBuffer | null = null;
        try {
          const db = await openDB(CACHE_DB_NAME, 1, {
            upgrade: (db) => {
              if (!db.objectStoreNames.contains(CACHE_STORE_NAME)) {
                db.createObjectStore(CACHE_STORE_NAME);
              }
            },
          });
          modelData = await db.get(CACHE_STORE_NAME, modelId);
        } catch (cacheErr) {
          console.warn('Failed to read from cache:', cacheErr);
        }

        // 2. If not in cache, fetch from Supabase Storage
        if (!modelData) {
          const bucketName = import.meta.env.VITE_MODEL_BUCKET_NAME || 'ar-models';

          // Get public URL using the file path
          const { data: urlData } = supabase.storage
            .from(bucketName)
            .getPublicUrl(modelFilePath);

          if (!urlData?.publicUrl) {
            throw new Error('Failed to generate model URL');
          }

          // Fetch the file with timeout
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), MODEL_LOAD_TIMEOUT);

          const response = await fetch(urlData.publicUrl, {
            signal: controller.signal,
          });
          clearTimeout(timeoutId);

          if (!response.ok) {
            throw new Error(`Failed to fetch model: ${response.statusText}`);
          }

          modelData = await response.arrayBuffer();

          // 3. Cache the model if it's not too large
          try {
            if (modelData.byteLength < CACHE_SIZE_LIMIT) {
              const db = await openDB(CACHE_DB_NAME, 1, {
                upgrade: (db) => {
                  if (!db.objectStoreNames.contains(CACHE_STORE_NAME)) {
                    db.createObjectStore(CACHE_STORE_NAME);
                  }
                },
              });
              await db.put(CACHE_STORE_NAME, modelData, modelId);
            }
          } catch (cacheErr) {
            console.warn('Failed to cache model:', cacheErr);
            // Continue even if caching fails
          }
        }

        // 4. Parse GLB with Three.js
        const loader = new GLTFLoader();
        const blob = new Blob([modelData], { type: 'model/gltf-binary' });
        const url = URL.createObjectURL(blob);

        const gltfData = await loader.loadAsync(url);
        URL.revokeObjectURL(url);

        setModel(gltfData.scene);
      } catch (err: any) {
        let errorMessage = 'Failed to load 3D model';
        if (err?.name === 'AbortError') {
          errorMessage = 'Model loading timed out';
        } else if (err?.message) {
          errorMessage = err.message;
        }
        setError(errorMessage);
        console.error(errorMessage, err);
      } finally {
        setIsLoading(false);
      }
    };

    loadModel();
  }, [modelId, modelFilePath]);

  return { model, isLoading, error };
};

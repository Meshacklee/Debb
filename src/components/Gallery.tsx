import React, { useState, useRef, useEffect } from 'react';
import { GalleryItem } from '../types';
import { Button } from './Button';
import { motion, AnimatePresence } from 'motion/react';
import { db, auth } from '../firebase';
import { 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  addDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const Gallery: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [isAddingUrl, setIsAddingUrl] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const path = 'gallery';
    const q = query(collection(db, path), orderBy('timestamp', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const galleryItems: GalleryItem[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        galleryItems.push({
          id: doc.id,
          url: data.url,
          title: data.title,
          type: data.type,
          timestamp: data.timestamp instanceof Timestamp ? data.timestamp.toMillis() : data.timestamp,
          uid: data.uid
        });
      });
      setItems(galleryItems);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    });

    return () => unsubscribe();
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !auth.currentUser) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const path = 'gallery';
        try {
          await addDoc(collection(db, path), {
            url: event.target?.result as string,
            title: file.name,
            type: file.type,
            timestamp: serverTimestamp(),
            uid: auth.currentUser?.uid,
          });
        } catch (error) {
          handleFirestoreError(error, OperationType.CREATE, path);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl || !auth.currentUser) return;

    const path = 'gallery';
    try {
      await addDoc(collection(db, path), {
        url: imageUrl,
        title: 'External Image',
        type: 'image/external',
        timestamp: serverTimestamp(),
        uid: auth.currentUser?.uid,
      });
      setImageUrl('');
      setIsAddingUrl(false);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  const removeImage = async (id: string) => {
    const path = `gallery/${id}`;
    try {
      await deleteDoc(doc(db, 'gallery', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  return (
    <section className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h3 className="text-2xl font-extrabold font-headline tracking-tight text-on-surface">Design Gallery</h3>
          <p className="text-on-surface-variant">Showcase your latest creative works</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            icon="link" 
            onClick={() => setIsAddingUrl(!isAddingUrl)}
          >
            Add URL
          </Button>
          <Button 
            variant="primary" 
            icon="add_photo_alternate" 
            onClick={() => fileInputRef.current?.click()}
          >
            Upload Design
          </Button>
        </div>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileUpload} 
          className="hidden" 
          accept="image/*" 
          multiple 
        />
      </div>

      <AnimatePresence>
        {isAddingUrl && (
          <motion.form 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            onSubmit={handleAddUrl}
            className="flex gap-2 overflow-hidden"
          >
            <input 
              type="url" 
              placeholder="Paste image URL here (Cloudinary, etc.)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="flex-1 px-4 py-2 rounded-xl bg-surface-container-low border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary/20 text-on-surface"
              required
            />
            <Button type="submit" variant="primary">Add</Button>
          </motion.form>
        )}
      </AnimatePresence>

      {items.length === 0 ? (
        <div className="border-2 border-dashed border-outline-variant rounded-3xl p-12 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-outline">
            <span className="material-symbols-outlined text-4xl">imagesmode</span>
          </div>
          <div>
            <p className="font-bold text-on-surface">No designs uploaded yet</p>
            <p className="text-sm text-on-surface-variant">Upload files or add URLs to build your portfolio</p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => setIsAddingUrl(true)}>
              Add URL
            </Button>
            <Button variant="ghost" onClick={() => fileInputRef.current?.click()}>
              Browse Files
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative aspect-square bg-surface-container-low rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
              >
                <img 
                  src={item.url} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <p className="text-white font-bold text-sm truncate">{item.title}</p>
                  {auth.currentUser?.uid === item.uid && (
                    <button 
                      onClick={() => removeImage(item.id)}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-error transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
};

import { useState, useEffect, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { auth, db } from '../config/firebase';
import { collection, addDoc, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { AuthContext } from '../contexts/AuthContextType';

const FirestoreTest = () => {
  const [status, setStatus] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Give auth time to initialize
    const timer = setTimeout(() => {
      setIsReady(true);
      if (currentUser) {
        addLog(`🔐 Detected logged in user: ${currentUser.email}`);
      } else if (auth.currentUser) {
        addLog(`🔐 Detected logged in user: ${auth.currentUser.email}`);
      } else {
        addLog('⚠️ No user detected - please refresh page after logging in');
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [currentUser]);

  const addLog = (message: string) => {
    setStatus(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
    console.log(message);
  };

  const testFirestoreWrite = async () => {
    setLoading(true);
    setStatus([]);
    
    try {
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        addLog('❌ No user logged in! Please login first.');
        setLoading(false);
        return;
      }
      
      addLog(`✅ User authenticated: ${currentUser.email}`);
      addLog(`📝 User ID: ${currentUser.uid}`);
      
      // Test write
      addLog('📤 Attempting to write to Firestore...');
      const testData = {
        userId: currentUser.uid,
        image: 'test-image-url',
        prediction: 'Test Prediction',
        confidence: 0.95,
        extractedText: 'Test text',
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        createdAt: Timestamp.now(),
      };
      
      const docRef = await addDoc(collection(db, 'analysisHistory'), testData);
      addLog(`✅ Successfully written to Firestore! Doc ID: ${docRef.id}`);
      
      // Test read
      addLog('📥 Attempting to read from Firestore...');
      const q = query(
        collection(db, 'analysisHistory'),
        where('userId', '==', currentUser.uid)
      );
      
      const querySnapshot = await getDocs(q);
      addLog(`✅ Successfully read ${querySnapshot.size} documents from Firestore`);
      
      querySnapshot.forEach((doc) => {
        addLog(`📄 Document ${doc.id}: ${doc.data().prediction}`);
      });
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorCode = error instanceof Error && 'code' in error ? (error as { code: string }).code : 'N/A';
      addLog(`❌ Error: ${errorMessage}`);
      addLog(`❌ Error code: ${errorCode}`);
      addLog(`❌ Full error: ${JSON.stringify(error, null, 2)}`);
    }
    
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <Card>
        <CardHeader>
          <CardTitle>Firestore Connection Test</CardTitle>
          <CardDescription>
            Test your Firestore connection and security rules
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-slate-600">
              <strong>Current User:</strong> {currentUser?.email || auth.currentUser?.email || 'Not logged in'}
            </p>
            <p className="text-sm text-slate-600">
              <strong>User ID:</strong> {currentUser?.uid || auth.currentUser?.uid || 'N/A'}
            </p>
            <p className="text-sm text-slate-600">
              <strong>Auth Status:</strong> {isReady ? (currentUser || auth.currentUser ? '✅ Ready' : '❌ Not authenticated') : '⏳ Checking...'}
            </p>
          </div>

          <Button 
            onClick={testFirestoreWrite} 
            disabled={loading || !(currentUser || auth.currentUser)}
            className="w-full"
          >
            {loading ? 'Testing...' : 'Test Firestore Connection'}
          </Button>

          {!(currentUser || auth.currentUser) && isReady && (
            <p className="text-sm text-orange-600">
              ⚠️ Please login first to test Firestore. If you're already logged in, try refreshing the page.
            </p>
          )}

          <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-xs space-y-1 max-h-96 overflow-auto">
            {status.length === 0 ? (
              <p>Click the button above to test Firestore connection...</p>
            ) : (
              status.map((log, i) => <div key={i}>{log}</div>)
            )}
          </div>

          <div className="border-t pt-4 space-y-2">
            <h3 className="font-semibold">Troubleshooting:</h3>
            <ul className="text-sm text-slate-600 space-y-1 list-disc pl-5">
              <li>Make sure you're logged in</li>
              <li>Check Firestore is enabled in Firebase Console</li>
              <li>Verify security rules allow authenticated users to write</li>
              <li>Check browser console (F12) for detailed errors</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FirestoreTest;

import { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  IonLoading,
  IonToast,
  IonText
} from '@ionic/react';

import { Character } from '../models/Character';
import { getCharacters } from '../services/futurama.service';
import CharacterListItem from '../components/CharacterListItem';

import './Home.css';

const Home: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadCharacters = async () => {
    setLoading(true);
    setError(null);

    try {
      const items = await getCharacters();
      setCharacters(items);
    } catch (err) {
      console.error(err);
      setError('No se pudo cargar la lista de personajes.');
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  };

  useIonViewWillEnter(() => {
    loadCharacters();
  });

  const refresh = async (e: CustomEvent) => {
    await loadCharacters();
    e.detail.complete();
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Personajes de Futurama</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent />
        </IonRefresher>

        <IonLoading
          isOpen={loading}
          message="Cargando personajes..."
          spinner="crescent"
        />

        <IonToast
          isOpen={!!error}
          message={error ?? ''}
          color="danger"
          duration={3000}
          onDidDismiss={() => setError(null)}
        />

        {!loading && !error && characters.length === 0 && (
          <div className="empty-state">
            <IonText>No se encontraron personajes.</IonText>
          </div>
        )}

        <IonList>
          {characters.map((character) => (
            <CharacterListItem
              key={character.id}
              character={character}
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;

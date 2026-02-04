import {
  IonAvatar,
  IonItem,
  IonLabel,
  IonNote
} from '@ionic/react';

import { Character } from '../models/Character';
import './CharacterListItem.css';

interface CharacterListItemProps {
  character: Character;
}

const CharacterListItem: React.FC<CharacterListItemProps> = ({ character }) => {
  return (
    <IonItem id="character-list-item">
      <IonAvatar slot="start">
        <img src={character.image} alt={character.name} />
      </IonAvatar>

      <IonLabel className="ion-text-wrap">
        <h2>{character.name}</h2>
        <h3>Género: {character.gender}</h3>
        <p>Estado: {character.status}</p>
      </IonLabel>

      <IonNote slot="end" className="species-note">
        {character.species}
      </IonNote>
    </IonItem>
  );
};

export default CharacterListItem;

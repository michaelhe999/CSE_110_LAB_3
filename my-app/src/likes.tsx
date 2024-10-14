import React, { useState } from 'react';
import { Note } from './types';

interface ClickLikeButtonProps {
    item: Note;
    likedNotes: Note[];
    setLikedNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

export function ClickLikeButton({ item, likedNotes, setLikedNotes }: ClickLikeButtonProps) {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(count + 1);
        if (count % 2 === 0) {
            // Add to likedNotes if it's not already in the list
            if (!likedNotes.includes(item)) {
                setLikedNotes([...likedNotes, item]);
            }
        } else {
            // Remove from likedNotes if it's already in the list
            setLikedNotes(likedNotes.filter(note => note.id !== item.id));
        }
    };

    const buttonShape = count % 2 === 0 ? '♡' : '❤️';

    return (
        <div>
            <button onClick={handleClick}>{buttonShape}</button>
        </div>
    );
}

interface LikedNotesProps {
    likedNotes: Note[];
}

export function LikedNotes({ likedNotes }: LikedNotesProps) {
    return (
        <ol>
            {likedNotes.map((note, index) => (
                <li key={index}>{note.title}</li>
            ))}
        </ol>
    );
}
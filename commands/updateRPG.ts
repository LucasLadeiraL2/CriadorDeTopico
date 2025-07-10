import db from '../data/database';
import { deleteRPG } from './deleteRPG';
import { createRPG } from './createRPG';

function updateRPG(abbreviation: string, user_id: string, topics: string): string {
    deleteRPG(abbreviation, user_id);
    createRPG(abbreviation, user_id, topics);
    
    return `RPG **${abbreviation}** has been updated successfully with new topics.`;
}

export { updateRPG };
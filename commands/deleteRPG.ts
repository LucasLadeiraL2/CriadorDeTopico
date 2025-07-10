import db from '../data/database';

interface selectUser {
    user_id: string;
}

function deleteRPG(abbreviation:string, user_id:string): string {
    const check = db.prepare(`SELECT user_id FROM rpg WHERE abbreviation = ?`).get(abbreviation) as selectUser | undefined;

    if (!check) {
        return `RPG **${abbreviation}** not found.`;
    }

    if (check.user_id === user_id) {
        db.prepare(`DELETE FROM rpg WHERE abbreviation = ?`).run(abbreviation);
        return `RPG **${abbreviation}** has been deleted successfully.`;
    } else {
        return `You do not have permission to delete the RPG **${abbreviation}**.`;
    }
}

export { deleteRPG };
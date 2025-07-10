import db from '../data/database';

interface selectAbbreviation {
    abbreviation: string;
}

function listRPGs(): string {
    const select = db.prepare(`SELECT abbreviation FROM rpg`);
    const abbreviations = select.all() as selectAbbreviation[];

    if (abbreviations.length === 0) {
        return "No RPGs found.";
    }

    return `Available RPGs: ${abbreviations.map(rpg => rpg.abbreviation).join(', ')}`;
}

export { listRPGs };
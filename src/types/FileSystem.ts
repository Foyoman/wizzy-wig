export interface FsFile {
	id: number;
	title: string;
	dateCreated: Date;
	lastUpdated: Date;
	isFolder: boolean;
	fileId?: string;
	children?: FsFile[];
}

export type SortFunction = (
	files: FsFile[], 
	sortKey: "title" | "dateCreated" | "lastUpdated"
) => FsFile[];
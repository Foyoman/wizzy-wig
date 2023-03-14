export interface FsFile {
	id: number;
	title: string;
	dateCreated: Date;
	lastUpdated: Date;
	isFolder: boolean;
	fileId?: string;
	children?: Array<FsFile>;
}
export interface Flag {
	id: number;
	name: string;
	enabled: boolean;
	preProdEnabled?: boolean;
}

export interface FlagProps {
	env: string;
	flags: Flag[];
}

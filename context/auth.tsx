import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/services/api';
import * as auth from '../services/auth';
import { useSnackBars } from './snack';

interface User {
	name: string;
	token: string;
}

interface AuthContextData {
	signed: boolean;
	user: User | null;
	loading: boolean;
	signIn(name: string, password: string): Promise<void>;
	signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
	children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const { addAlert } = useSnackBars();

	useEffect(() => {
		async function loadStorageData() {
			const storedUser = await AsyncStorage.getItem('@RNAuth:user');
			const storedToken = await AsyncStorage.getItem('@RNAuth:token');

			if (storedUser && storedToken) {
				api.defaults.headers.Authorization = `Bearer ${storedToken}`;

				setUser(JSON.parse(storedUser));
			}
			// Note: debug, if Eae load then the screen is load auth provider
			// addAlert('Eae');
			setLoading(false);
		}

		loadStorageData();
	}, [addAlert]);

	async function signIn(name: string, password: string) {
		const response = await auth.signIn(name, password);

		setUser({name: response.username, token: response.token});

		api.defaults.headers.Authorization = `Bearer ${response.token}`;

		await AsyncStorage.setItem('@RNAuth:username', JSON.stringify(response.username));
		await AsyncStorage.setItem('@RNAuth:token', JSON.stringify(response.token));
		addAlert('Bem vindo');
	}

	function signOut() {
		AsyncStorage.clear().then(() => {
			setUser(null);
			
		});
		addAlert('Falou');
	}

	return (
		<AuthContext.Provider
			value={{ signed: !!user, loading, user, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
};

export function useAuth() {
	const context = useContext(AuthContext);

	return context;
}
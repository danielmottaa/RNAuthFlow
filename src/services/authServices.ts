import { IAuthData } from "../contexts/Auth";

function signIn(email: string, password: string): Promise<IAuthData> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(password === '123456') {
        resolve({
          token: 'fake-token',
          email,
          name: 'Daniel Motta',
        });
      } else {
        reject(new Error('credenciais inválidas'));
      }
    }, 500)
  });
}

export const authService = {signIn}
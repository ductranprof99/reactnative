interface Response {
    token: string;
    user: {
      name: string;
      password: string;
    };
  }
  
  export function signIn(name: string, password: string): Promise<Response> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          token: 'e9ds8afhjads89jfadsj8jjcuaidjiua',
          user: {
            name: name,
            password: password,
          },
        });
      }, 400);
    });
  }
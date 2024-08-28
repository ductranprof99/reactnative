interface Response {
  token: string;
  username: string
}

export function signIn(name: string, password: string): Promise<Response> {
  return new Promise((resolve) => {
    // TODO: call api here
    setTimeout(() => {
      resolve({
        token: 'e9ds8afhjads89jfadsj8jjcuaidjiua',
        username: name
      });
    }, 400);
  });
}
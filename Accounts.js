class Accounts {
  constructor() {
    this.state = store.getState();
    this.apiClient = ApiService.getInstance().getApiClient();
  }

  /**
   * Make request to user profile
   */
  async getProfile() {
    const url = endpoints.accounts.get_profile;
    try {
      const response = await this.apiClient.get(url);
      if (response.status !== 200) {
        return {
          error: true,
          httpStatus: response.status,
          message:
            'Não foi possível realizar a requisição para pegar o profile do usuário',
        };
      }

      const responseJson = await response.data;
      return responseJson;
    } catch (error) {
      console.log(error.response);
      return {
        error: true,
        httpStatus: null,
        message:
          'Houve um erro de rede, por favor verifique sua conexão e tente novamente',
      };
    }
  }
}

interface Params {
  [key: number]: string;
}

type ParsedParams = {
    [key: string]: string;
};

export const parsePathParams = (params: Params, urlTemplate: string): ParsedParams => {
  const pathParams = params[0].split('/');

  const paramsList = urlTemplate
    .split(':')
    .filter(Boolean)
    .map((param) => param.replace('/', ''));

  return paramsList.reduce((acc, v, i) => {
    const value = pathParams[i];

    return {
      ...acc,
      [v]: value,
    };
  }, {});
};

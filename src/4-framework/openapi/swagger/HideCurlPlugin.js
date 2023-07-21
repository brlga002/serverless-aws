const HideCurlPlugin = () => {
  return {
    wrapComponents: {
      curl: () => () => null,
    },
  }
}

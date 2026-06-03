export default function () {
  return {
    isLoading: true,
    isSideMenuOpen: true,
    assemblies: [], // Este es el que se esta usando
    assembliesWaterWorks: [], // Este se usara para Wworks (t&t)
    assembliesVsi: [],
    currentVisibleAssemblies: [],
    lastVisibleAssemblies: null,
    limit: 8,
  };
}

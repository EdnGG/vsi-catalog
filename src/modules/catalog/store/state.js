export default function () {
  return {
    isLoading: true,
    isSideMenuOpen: true,
    assemblies: [], // Este es el que se esta usando
    assembliesVsi: [],
    assembliesWaterWorks: [], 
    currentVisibleAssemblies: [],
    lastVisibleAssemblies: null,
    limit: 8,
  }
}

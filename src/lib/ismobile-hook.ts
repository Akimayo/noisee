import { useMediaPredicate } from "react-media-hook";

export const useIsMobile = () => useMediaPredicate("(max-width: 900px)");

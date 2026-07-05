import shared from "./sections/shared.module.css";
import hero from "./sections/hero.module.css";
import story from "./sections/story.module.css";
import gallery from "./sections/gallery.module.css";
import video from "./sections/video.module.css";
import details from "./sections/details.module.css";
import rsvp from "./sections/rsvp.module.css";
import footer from "./sections/footer.module.css";

const pageStyles = {
  ...shared,
  ...hero,
  ...story,
  ...gallery,
  ...video,
  ...details,
  ...rsvp,
  ...footer,
};

export default pageStyles;

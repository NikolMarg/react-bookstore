import { useEffect } from 'react';
import { WEBPAGE_TITLE_DEFAULT } from '../../../constants';

const DocumentTitle = ({ title }) => {
  useEffect(() => {
    if (document && document.title) {
      document.title =
        (title && `${title} - ${WEBPAGE_TITLE_DEFAULT}`) ||
        WEBPAGE_TITLE_DEFAULT;
    }

    return () => {
      // Return function is a clean up function equiv ComponentWillUnmount
      if (document && document.title) {
        document.title = WEBPAGE_TITLE_DEFAULT;
      }
    };
  }, [title]); // Run effect only when 'title' changes

  return null;
};

export default DocumentTitle;

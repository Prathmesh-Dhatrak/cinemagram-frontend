import { useLayoutEffect } from 'react';

const useDocumentTitle = (title: string) => {
	useLayoutEffect(() => {
		if (title) {
			document.title = title;
		} else {
			document.title = 'Cinemagram | Community Platform';
		}
	}, [title]);
};

export default useDocumentTitle;

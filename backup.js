document.addEventListener('DOMContentLoaded', function () {
    const scrapbookPage = document.querySelector('.scrapbook-page');
    const uploadPhotoBtn = document.getElementById('uploadPhotoBtn');
    const triggerUploadPhotoBtn = document.getElementById('triggerUploadPhotoBtn');
    const addNoteBtn = document.getElementById('addNoteBtn');
    const previousPageBtn = document.getElementById('previousPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');
    const savePageBtn = document.getElementById('savePageBtn');
    const deletePageBtn = document.getElementById('deletePageBtn');

    let currentPage = 0;
    let pages = JSON.parse(localStorage.getItem('scrapbookPages')) || [];

    function renderPage(pageIndex) {
        scrapbookPage.innerHTML = '';
        if (pages[pageIndex]) {
            scrapbookPage.innerHTML = pages[pageIndex];
            scrapbookPage.querySelectorAll('.resizable').forEach(element => {
                makeElementDraggable(element);
                makeElementResizable(element);
            });
        }
    }

    function saveCurrentPage() {
        pages[currentPage] = scrapbookPage.innerHTML;
        localStorage.setItem('scrapbookPages', JSON.stringify(pages));
    }

    function deleteCurrentPage() {
        if (pages.length > 1) {
            pages.splice(currentPage, 1);
            if (currentPage > 0) currentPage--;
            localStorage.setItem('scrapbookPages', JSON.stringify(pages));
            renderPage(currentPage);
        } else {
            alert("Cannot delete the last remaining page.");
        }
    }

    // Initial render of the first page
    renderPage(currentPage);

    // Event listeners
    triggerUploadPhotoBtn.addEventListener('click', () => {
        uploadPhotoBtn.click();
    });

    uploadPhotoBtn.addEventListener('change', function (event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.classList.add('resizable', 'img');
            img.style.position = 'absolute';
            img.style.width = '200px'; // Default width
            img.style.height = 'auto'; // Maintain aspect ratio
            img.style.top = '0px'; // Default position
            img.style.left = '0px'; // Default position
            scrapbookPage.appendChild(img);
            makeElementDraggable(img);
            makeElementResizable(img);
        };

        reader.readAsDataURL(file);
    });

    addNoteBtn.addEventListener('click', function () {
        const noteText = prompt('Enter your note:');
        if (noteText) {
            const note = document.createElement('div');
            note.textContent = noteText;
            note.classList.add('resizable', 'note');
            note.style.position = 'absolute';
            note.style.top = '0px';
            note.style.left = '0px';
            scrapbookPage.appendChild(note);
            makeElementDraggable(note);
            makeElementResizable(note);
        }
    });

    previousPageBtn.addEventListener('click', function () {
        if (currentPage > 0) {
            saveCurrentPage();
            currentPage--;
            renderPage(currentPage);
        }
    });

    nextPageBtn.addEventListener('click', function () {
        saveCurrentPage();
        currentPage++;
        if (!pages[currentPage]) {
            pages[currentPage] = '';
        }
        renderPage(currentPage);
    });

    savePageBtn.addEventListener('click', function () {
        saveCurrentPage();
        alert('Page saved successfully!');
    });

    deletePageBtn.addEventListener('click', function () {
        if (confirm('Are you sure you want to delete this page?')) {
            deleteCurrentPage();
        }
    });

    function makeElementDraggable(element) {
        let isDragging = false;
        let offsetX, offsetY;

        element.addEventListener('mousedown', function (e) {
            isDragging = true;
            offsetX = e.clientX - element.getBoundingClientRect().left;
            offsetY = e.clientY - element.getBoundingClientRect().top;

            function onMouseMove(event) {
                if (isDragging) {
                    let newX = event.clientX - offsetX - scrapbookPage.getBoundingClientRect().left;
                    let newY = event.clientY - offsetY - scrapbookPage.getBoundingClientRect().top;

                    // Boundary check
                    if (newX < 0) newX = 0;
                    if (newY < 0) newY = 0;
                    if (newX + element.offsetWidth > scrapbookPage.offsetWidth) {
                        newX = scrapbookPage.offsetWidth - element.offsetWidth;
                    }
                    if (newY + element.offsetHeight > scrapbookPage.offsetHeight) {
                        newY = scrapbookPage.offsetHeight - element.offsetHeight;
                    }

                    element.style.left = newX + 'px';
                    element.style.top = newY + 'px';
                }
            }

            document.addEventListener('mousemove', onMouseMove);

            document.addEventListener('mouseup', function () {
                isDragging = false;
                document.removeEventListener('mousemove', onMouseMove);
            });
        });

        element.ondragstart = function () {
            return false;
        };
    }

    function makeElementResizable(element) {
        element.style.position = 'absolute';
        element.style.overflow = 'auto';

        const resizeButton = document.createElement('div');
        resizeButton.style.position = 'absolute';
        resizeButton.style.width = '15px';
        resizeButton.style.height = '15px';
        resizeButton.style.background = '#ccc';
        resizeButton.style.borderRadius = '50%';
        resizeButton.style.bottom = '5px';
        resizeButton.style.right = '5px';
        resizeButton.style.cursor = 'nwse-resize';
        resizeButton.style.display = 'none';
        element.appendChild(resizeButton);

        resizeButton.addEventListener('mousedown', function (e) {
            e.preventDefault();
            let initialWidth = element.offsetWidth;
            let initialHeight = element.offsetHeight;
            let initialX = e.clientX;
            let initialY = e.clientY;

            function onMouseMove(event) {
                let newWidth = initialWidth + (event.clientX - initialX);
                let newHeight = initialHeight + (event.clientY - initialY);

                if (newWidth > 50) element.style.width = newWidth + 'px';
                if (newHeight > 50) element.style.height = newHeight + 'px';
            }

            document.addEventListener('mousemove', onMouseMove);

            document.addEventListener('mouseup', function () {
                document.removeEventListener('mousemove', onMouseMove);
            });
        });

        const deleteButton = document.createElement('div');
        deleteButton.style.position = 'absolute';
        deleteButton.style.width = '20px';
        deleteButton.style.height = '20px';
        deleteButton.style.background = 'red';
        deleteButton.style.color = 'white';
        deleteButton.style.borderRadius = '50%';
        deleteButton.style.display = 'none';
        deleteButton.style.alignItems = 'center';
        deleteButton.style.justifyContent = 'center';
        deleteButton.style.cursor = 'pointer';
        deleteButton.style.top = '5px';
        deleteButton.style.right = '5px';
        deleteButton.textContent = 'X';
        element.appendChild(deleteButton);

        element.addEventListener('click', function (e) {
            e.stopPropagation();
            document.querySelectorAll('.scrapbook-page .resizable').forEach(el => {
                el.querySelector('div').style.display = 'none';
            });
            deleteButton.style.display = 'flex';
            resizeButton.style.display = 'block';
        });

        deleteButton.addEventListener('click', function () {
            if (confirm('Are you sure you want to delete this element?')) {
                element.remove();
            }
        });
    }

    document.addEventListener('click', function () {
        document.querySelectorAll('.scrapbook-page .resizable').forEach(el => {
            el.querySelectorAll('div').forEach(btn => btn.style.display = 'none');
        });
    });
});

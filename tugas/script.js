// Menghapus item berdasarkan input pengguna
document.getElementById("removeItem").addEventListener("click", () => {
    const list = document.getElementById("list");
    const removeId = document.getElementById("removeIndex").value.trim();
    
    // Validasi input
    if (!removeId) {
        alert("Mohon masukkan ID item yang ingin dihapus!");
        return;
    }

    // Mencari item dengan id yang sesuai
    const itemToRemove = document.getElementById(removeId);
    
    // Validasi apakah item ditemukan
    if (itemToRemove?.classList.contains("list-item")) {
        list.removeChild(itemToRemove);
    } else {
        alert(`Item dengan ID "${removeId}" tidak ditemukan!`);
    }
    
    // Reset input field
    document.getElementById("removeIndex").value = "";
});



// Update fungsi addItem untuk menetapkan id berdasarkan id item terakhir
document.getElementById("addItem").addEventListener("click", () => {
    const list = document.getElementById("list");
    const newItem = document.createElement("li");
    newItem.classList = "list-item";

    // Mengambil id dari item terakhir, jika ada
    const lastItem = list.lastElementChild;
    const lastId = lastItem ? Number.parseInt(lastItem.id) : 0;
    
    // Menetapkan id baru dengan menambah 1 dari id terakhir
    const newId = lastId + 1;
    newItem.id = `${newId}`;
    newItem.textContent = `Item ${newId}`;
    
    list.appendChild(newItem);
});

// Fungsi untuk mengambil data posts dari JSONPlaceholder
async function fetchPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await response.json();
        return posts.slice(0, 5); // Mengambil 5 post pertama saja
    } catch (error) {
        throw new Error(`Gagal mengambil data: ${error.message}`);
    }
}

// Fungsi untuk mengambil data users dari JSONPlaceholder
async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        return users.slice(0, 3); // Mengambil 3 user pertama saja
    } catch (error) {
        throw new Error(`Gagal mengambil data: ${error.message}`);
    }
}

// Fungsi untuk mengambil data photos dari JSONPlaceholder
async function fetchPhotos() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/photos');
        const photos = await response.json();
        return photos.slice(0, 4); // Mengambil 4 foto pertama saja
    } catch (error) {
        throw new Error(`Gagal mengambil data: ${error.message}`);
    }
}

// Fungsi untuk menampilkan loading indicator
function showLoading() {
    const dataElement = document.getElementById('data');
    dataElement.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Loading data...</p>
        </div>
    `;
}

// Fungsi untuk menampilkan data dalam format yang rapi
function displayData(posts, users, photos) {
    const dataElement = document.getElementById('data');
    
    const content = `
        <div class="api-data">
            <div class="section">
                <h3>Posts Terbaru</h3>
                <div class="posts">
                    ${posts.map(post => `
                        <div class="post">
                            <h4>${post.title}</h4>
                            <p>${post.body}</p>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="section">
                <h3>Users</h3>
                <div class="users">
                    ${users.map(user => `
                        <div class="user">
                            <h4>${user.name}</h4>
                            <p>Email: ${user.email}</p>
                            <p>Company: ${user.company.name}</p>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="section">
                <h3>Photos</h3>
                <div class="photos">
                    ${photos.map(photo => `
                        <div class="photo">
                            <img src="${photo.thumbnailUrl}" alt="${photo.title}">
                            <p>${photo.title}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

    dataElement.innerHTML = content;
}

// Event listener dengan async/await
document.getElementById('loadData').addEventListener('click', async () => {
    try {
        showLoading();
        
        // Mengambil semua data secara parallel menggunakan Promise.all
        const [posts, users, photos] = await Promise.all([
            fetchPosts(),
            fetchUsers(),
            fetchPhotos()
        ]);

        displayData(posts, users, photos);
    } catch (error) {
        document.getElementById('data').innerHTML = `
            <div class="error">
                <p>Error: ${error.message}</p>
            </div>
        `;
    }
});

// Fungsi untuk menyimpan nama ke localStorage
document.getElementById("saveName").addEventListener("click", () => {
    const usernameInput = document.getElementById("username");
    const username = usernameInput.value.trim();
    const greeting = document.getElementById("greeting");

    if (username) {
        // Simpan nama
        localStorage.setItem("username", username);
        
        // Tampilkan pesan sukses
        displayFeedback("Nama berhasil disimpan!", "success");
        
        // Update greeting
        displayGreeting();
        
        // Reset input
        usernameInput.value = "";
    } else {
        displayFeedback("Mohon masukkan nama Anda!", "error");
    }
});

// Fungsi untuk menghapus nama dari localStorage
document.getElementById("deleteName").addEventListener("click", () => {
    const username = localStorage.getItem("username");
    
    if (username) {
        // Hapus nama dari localStorage
        localStorage.removeItem("username");
        
        // Tampilkan pesan sukses
        displayFeedback("Nama berhasil dihapus!", "success");
        
        // Update greeting
        displayGreeting();
        
        // Reset input field
        document.getElementById("username").value = "";
    } else {
        displayFeedback("Tidak ada nama yang tersimpan!", "error");
    }
});

// Fungsi untuk menampilkan greeting
function displayGreeting() {
    const username = localStorage.getItem("username");
    const greeting = document.getElementById("greeting");
    
    if (username) {
        greeting.innerHTML = `
            <div class="feedback-message success-message">
                Selamat datang, ${username}!
            </div>
        `;
    } else {
        greeting.innerHTML = `
            <div class="no-user-message">
                Belum ada nama yang tersimpan
            </div>
        `;
    }
}

// Fungsi untuk menampilkan feedback
function displayFeedback(message, type) {
    const greeting = document.getElementById("greeting");
    greeting.innerHTML = `
        <div class="feedback-message ${type === 'success' ? 'success-message' : 'error-message'}">
            ${message}
        </div>
    `;
    
    // Update greeting setelah beberapa detik
    setTimeout(() => {
        displayGreeting();
    }, 2000);
}

// Tampilkan greeting saat halaman dimuat
window.onload = () => {
    displayGreeting();
    updateDeleteButtonState();
};

// Fungsi untuk mengupdate status tombol hapus
function updateDeleteButtonState() {
    const deleteButton = document.getElementById("deleteName");
    const username = localStorage.getItem("username");
    
    // Disable tombol jika tidak ada nama tersimpan
    deleteButton.disabled = !username;
    if (!username) {
        deleteButton.classList.add('disabled');
    } else {
        deleteButton.classList.remove('disabled');
    }
}

// Update status tombol setiap kali ada perubahan pada localStorage
window.addEventListener('storage', updateDeleteButtonState);
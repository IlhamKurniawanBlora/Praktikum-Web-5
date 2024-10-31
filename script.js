// Menambah item baru ke daftar
// biome-ignore lint/complexity/useArrowFunction: <explanation>
document.getElementById("addItem").addEventListener("click", function() {
    const newItem = document.createElement("li");
    newItem.classList = "list-item";
    newItem.textContent = `Item ${document.querySelectorAll('li').length + 1}`;
    document.getElementById("list").appendChild(newItem);
});

// Menghapus item terakhir dari daftar
document.getElementById("removeItem").addEventListener("click", () => {
    const list = document.getElementById("list");
    if (list.lastElementChild) {
        list.removeChild(list.lastElementChild);
    }
});

// Menyimpan nama ke localStorage dan menampilkan pesan selamat datang
document.getElementById("saveName").addEventListener("click", () => {
    const username = document.getElementById("username").value;
    if (username) {
        localStorage.setItem("username", username);
        displayGreeting();
    }
});

// Menampilkan pesan selamat datang jika nama tersimpan di localStorage
function displayGreeting() {
    const username = localStorage.getItem("username");
    const greeting = document.getElementById("greeting");
    if (username) {
        greeting.textContent = `Selamat datang, ${username}!`;
    }
}

// Menampilkan pesan selamat datang saat halaman dimuat
window.onload = displayGreeting;

function loadDataCallback(callback) {
    setTimeout(() => {
        const data = "Data berhasil dimuat!";
        callback(data);
    }, 2000); // Simulasi delay 2 detik
}

// biome-ignore lint/complexity/useArrowFunction: <explanation>
document.getElementById('loadData').addEventListener('click', function() {
    loadDataCallback((result) => {
        document.getElementById('data').textContent = result;
    });
});

function loadDataPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = true;
            if (success) {
                resolve('Data berhasil dimuat dengan Promise!');
            } else {
                reject('Gagal memuat data.');
            }
        }, 2000);
    });
}

// biome-ignore lint/complexity/useArrowFunction: <explanation>
document.getElementById('loadData').addEventListener('click', function() {
    loadDataPromise()
        .then(result => {
            document.getElementById('data').textContent = result;
        })
        .catch(error => {
            document.getElementById('data').textContent = error;
        });
});
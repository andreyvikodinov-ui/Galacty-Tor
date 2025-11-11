// Главные переменные
let scene, camera, renderer, starGeo, stars;
let cube;
let mouseX = 0, mouseY = 0;

// Инициализация сцены
function init() {
    // Создаем сцену (место, где всё происходит)
    scene = new THREE.Scene();

    // Создаем камеру (глаза, через которые мы смотрим на сцену)
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = Math.PI / 2;

    // Создаем рендерер (художник, который рисует сцену)
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Создаем звездное поле
    starGeo = new THREE.BufferGeometry();
    const starVertices = [];
    for (let i = 0; i < 6000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starVertices.push(x, y, z);
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

    const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.7,
    });

    stars = new THREE.Points(starGeo, starMaterial);
    scene.add(stars);

    // Создаем центральный 3D-объект (Тороид/Бублик)
    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        wireframe: true // Сетчатый вид для стиля
    });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Слушаем движение мыши
    document.addEventListener('mousemove', onMouseMove, false);

    // Запускаем анимацию
    animate();

    // Обрабатываем изменение размера окна
    window.addEventListener('resize', onWindowResize, false);
}

// Обработчик движения мыши
function onMouseMove(event) {
    mouseX = (event.clientX - window.innerWidth / 2);
    mouseY = (event.clientY - window.innerHeight / 2);
}

// Цикл анимации (самая важная функция!)
function animate() {
    requestAnimationFrame(animate);

    // Вращаем звезды
    stars.rotation.y += 0.0005;
    stars.rotation.x += 0.0002;

    // Вращаем и двигаем центральный объект в зависимости от положения мыши
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.position.x = (mouseX * 0.01);
    cube.position.y = -(mouseY * 0.01);

    // Рендерим сцену
    renderer.render(scene, camera);
}

// Обработчик изменения размера окна
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Запускаем всё!
init();
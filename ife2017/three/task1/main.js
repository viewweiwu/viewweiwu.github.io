(() => {
    class Ctrl {
        constructor() {
            this.w = window.innerWidth;
            this.h = window.innerHeight;
            this.size = 10;
            this.space = this.size / 10;
            this.isMove = false;
            this.yDeg = 45;
            this.xDeg = 45;
            this.init();
            this.bind();
            this.render();
        }
        init() {
            // 初始化 场景
            this.initScene();
            // 初始化 照相机
            this.initCamera();
            // 初始化 画布
            this.initRenderer();
            // 初始化 灯光
            this.initLight();
            // 初始化 墙壁
            this.initWall();
            // 初始化 自行车
            this.initBike();
        }
        initScene() {
            this.scene = new THREE.Scene();
        }
        initCamera() {
            let camera = new THREE.PerspectiveCamera(75, this.w / this.h, 1, 1000);
            this.scene.add(camera);
            camera.position.set(15, 15, 15);
            camera.lookAt({
                x: 7,
                y: 6,
                z: 5
            });
            this.camera = camera;
        }
        initRenderer() {
            let renderer = new THREE.WebGLRenderer();
            let el = renderer.domElement;
            renderer.setClearColor("#333");
            renderer.setSize(this.w, this.h);
            document.body.appendChild(el);
            this.renderer = renderer;
            this.el = el;
        }
        initLight() {
            let light = new THREE.PointLight(0xffffff, 1.5, 100);
            light.position.set(20, 20, 20);
            this.light = light;
            this.scene.add(light);
        }
        initWall() {
            let geometry = new THREE.Geometry();
            let material = new THREE.MeshLambertMaterial({ color: 0xffffff });
            let size = this.size;
            let space = this.space;

            let wall1 = new THREE.Mesh(new THREE.BoxGeometry(size, size, space), material);
            let wall2 = new THREE.Mesh(new THREE.BoxGeometry(size, space, size), material);
            let wall3 = new THREE.Mesh(new THREE.BoxGeometry(space, size, size), material);

            // 移动到负距离
            let s = size / 2 - space;

            wall1.position.set(s, s, -space / 2);
            wall2.position.set(s, -space / 2, s);
            wall3.position.set(-space / 2, s, s);

            this.scene.add(wall1);
            this.scene.add(wall2);
            this.scene.add(wall3);
        }
        initBike() {
            // 初始化 轮胎
            this.initWheel();
            // 初始化 齿轮
            this.initGear();
            // 初始化 支架
            this.initBracket();
            // 初始化 座位
            this.initSeat();
            // 初始化 方向盘
            this.initSteeringWheel();
        }
        initWheel() {
            let material = new THREE.MeshLambertMaterial({ color: 0x66ccff });

            let fw = new THREE.Mesh(new THREE.TorusGeometry(2, .2, 20, 20), material);
            let bw = new THREE.Mesh(new THREE.TorusGeometry(2, .2, 20, 20), material);

            // front wheel and back wheel
            fw.position.set(12, 5, 5);
            bw.position.set(5, 5, 5);

            this.scene.add(fw);
            this.scene.add(bw);
        }
        initGear() {
            let material = new THREE.MeshLambertMaterial({ color: 0x66ccff });

            // small gear and large gear
            let sg = new THREE.Mesh(new THREE.TorusGeometry(.3, .05, 20, 20), material);
            let lg = new THREE.Mesh(new THREE.TorusGeometry(.8, .05, 20, 20), material);

            sg.position.set(5, 5, 5);
            lg.position.set(8.5, 5, 5);

            this.scene.add(sg);
            this.scene.add(lg);
        }
        initBracket() {
            let material = new THREE.MeshLambertMaterial({ color: 0x66ccff });

            let a = new THREE.Mesh(new THREE.CylinderGeometry(.1, .1, 3.5, 20), material);
            let b = new THREE.Mesh(new THREE.CylinderGeometry(.1, .1, 3.5, 20), material);
            let c = new THREE.Mesh(new THREE.CylinderGeometry(.1, .1, 3.5, 20), material);
            let d = new THREE.Mesh(new THREE.CylinderGeometry(.1, .1, 3.5, 20), material);
            let e = new THREE.Mesh(new THREE.CylinderGeometry(.1, .1, 5, 20), material);
            let f = new THREE.Mesh(new THREE.CylinderGeometry(.1, .1, 5, 20), material);

            a.rotation.z = Math.PI / 2;
            b.rotation.z = -Math.PI / 6;
            c.rotation.z = Math.PI / 2;
            d.rotation.z = -Math.PI / 6;
            e.rotation.z = Math.PI / 6;
            f.rotation.z = Math.PI / 6;

            a.position.set(6.75, 5, 5);
            b.position.set(5.95, 6.5, 5);
            c.position.set(8.48, 8, 5);
            d.position.set(9.3, 6.5, 5);
            e.position.set(7.3, 7.15, 5);
            f.position.set(10.75, 7.15, 5);

            this.scene.add(a);
            this.scene.add(b);
            this.scene.add(c);
            this.scene.add(d);
            this.scene.add(e);
            this.scene.add(f);
        }
        initSeat() {
            let material = new THREE.MeshLambertMaterial({ color: 0x66ccff });

            let s = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, .2, 20), material);

            s.position.set(6.1, 9.3, 5);

            this.scene.add(s);
        }
        initSteeringWheel() {
            let material = new THREE.MeshLambertMaterial({ color: 0x66ccff });

            let s = new THREE.Mesh(new THREE.CylinderGeometry(.1, .1, 3.5, 20), material);

            s.rotation.x = Math.PI / 2;

            s.position.set(9.5, 9.3, 5);

            this.scene.add(s);
        }
        render() {
            this.renderer.render(this.scene, this.camera);
        }
        bind() {
            this.el.addEventListener("mousedown", this.onMouseDown.bind(this));
            this.el.addEventListener("mousemove", this.onMouseMove.bind(this));
            this.el.addEventListener("mouseup", this.onMouseUp.bind(this));
        }
        onMouseDown(e) {
            this.isMove = true;
            this.position = {
                x: e.pageX,
                y: e.pageY
            }
        }
        onMouseMove(e) {
            if (!this.isMove) return;
            let size = 7.5;
            let r = Math.sqrt(Math.pow(size, 2) + Math.pow(size, 2));
            let p1 = {};
            let p2 = {};

            let x = e.pageX - this.position.x;
            let y = e.pageY - this.position.y;

            this.xDeg += x / 10;
            this.yDeg += y / 5;

            this.yDeg = this.yDeg > 90 ? 90 : this.yDeg;
            this.yDeg = this.yDeg < -90 ? -90 : this.yDeg;

            p1 = util.getPoint(size, size, r, this.xDeg);
            p2 = util.getPoint(size, size, r, this.yDeg);

            this.camera.position.x = p1.x;
            this.camera.position.y = p2.y;
            this.camera.position.z = p1.y;

            this.camera.lookAt({
                x: 5,
                y: 5,
                z: 5
            });

            this.position.x = e.pageX;
            this.position.y = e.pageY;

            this.render();
        }
        onMouseUp(e) {
            this.isMove = false;
        }

    }

    let util = {
        getPoint(x, y, r, deg) {
            let point = {
                x: x + r * Math.cos(deg * Math.PI / 180),
                y: y + r * Math.sin(deg * Math.PI / 180)
            }
            return point;
        }
    }


    new Ctrl();
})();
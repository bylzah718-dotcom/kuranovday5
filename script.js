// Глобальное состояние
        let currentScreen = 'home';
        let currentBpm = 78;
        let userAge = 25; // Дефолтный возраст

        // Генерация кастомных элементов списка (от 7 до 110)
        function initAgeSelect() {
            const box = document.getElementById('customOptionsBox');
            box.innerHTML = ''; // Очистка
            
            for (let i = 7; i <= 110; i++) {
                const opt = document.createElement('div');
                opt.className = 'custom-option';
                opt.innerText = `${i} лет`;
                opt.setAttribute('data-value', i);
                
                // Клик по элементу списка
                opt.onclick = function(e) {
                    e.stopPropagation(); // Чтобы не закрывалось мгновенно
                    selectAge(i);
                };
                
                box.appendChild(opt);
            }
            
            document.getElementById('ageDisplay').innerText = `${userAge} лет`;
            calculateRecommendedPulse();
        }

        // Показать/скрыть кастомный выпадающий список
        function toggleAgeDropdown(event) {
            event.stopPropagation();
            const box = document.getElementById('customOptionsBox');
            box.classList.toggle('show');
        }

        // Выбор конкретного возраста из кастомного списка
        function selectAge(age) {
            userAge = age;
            document.getElementById('ageDisplay').innerText = `${age} лет`;
            document.getElementById('customOptionsBox').classList.remove('show');
            calculateRecommendedPulse();
        }

        // Закрывать выпадающий список, если кликнули в любое другое место экрана часов
        document.getElementById('appContainer').onclick = function() {
            document.getElementById('customOptionsBox').classList.remove('show');
        };

        // Функция для обновления часов
        function updateClock() {
            const clockEl = document.getElementById('clock');
            if (clockEl) {
                const now = new Date();
                clockEl.innerText = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
            }
        }

        // Расчет рекомендуемого пульса по условию
        function calculateRecommendedPulse() {
            let recPulse = "";
            if (userAge >= 7 && userAge <= 30) {
                recPulse = "120 уд/мин";
            } else if (userAge >= 31 && userAge <= 47) {
                recPulse = "90 уд/мин";
            } else if (userAge >= 48 && userAge <= 110) {
                recPulse = "78 уд/мин";
            }
            document.getElementById('recommendedPulse').innerText = recPulse;
        }

        // Переключение пульса и обновление UI
        function setPulseState(bpm) {
            currentBpm = bpm;
            
            // Обновляем активный кружок на экране профиля
            document.querySelectorAll('.pulse-circle').forEach(c => c.classList.remove('active'));
            if (bpm === 78) document.getElementById('circle-78').classList.add('active');
            if (bpm === 90) document.getElementById('circle-90').classList.add('active');
            if (bpm === 120) document.getElementById('circle-120').classList.add('active');

            updateBpmUI(bpm);
        }

        // Синхронизация стилей под выбранный BPM
        function updateBpmUI(bpm) {
            const container = document.getElementById('appContainer');
            container.classList.remove('state-78', 'state-90', 'state-120');
            container.classList.add(`state-${bpm}`);

            const pulseNumEl = document.getElementById('pulseNumber');
            const isPulseOn = document.getElementById('pulseToggle').checked;
            if (isPulseOn) {
                pulseNumEl.innerText = bpm;
            } else {
                pulseNumEl.innerText = "--";
            }

            const tagLeftText = document.getElementById('tagLeftText');
            const tagRightText = document.getElementById('tagRightText');
            const trackCover = document.getElementById('trackCover');
            const trackTitle = document.getElementById('trackTitle');
            const trackArtist = document.getElementById('trackArtist');
            const repeatIcon = document.getElementById('repeatIcon');

            if (bpm === 78) {
                tagLeftText.innerText = "Кайф";
                tagRightText.innerText = "Гармония";
                trackTitle.innerText = "Aria math";
                trackArtist.innerText = "alterity";
                trackCover.style.backgroundImage = "url('https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=100&q=80')";
                repeatIcon.style.display = "block";
            } else if (bpm === 90) {
                tagLeftText.innerText = "Напряг";
                tagRightText.innerText = "Драйв";
                trackTitle.innerText = "Don`t stay";
                trackArtist.innerText = "Linkin Park";
                trackCover.style.backgroundImage = "url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&q=80')";
                repeatIcon.style.display = "block";
            } else if (bpm === 120) {
                tagLeftText.innerText = "Безумие";
                tagRightText.innerText = "Авария";
                trackTitle.innerText = "O KUR....";
                trackArtist.innerText = "B-Stork";
                trackCover.style.backgroundImage = "url('https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?w=100&q=80')";
                repeatIcon.style.display = "block";
            }

            updateNavColors();
            updateHeader();
        }

        // Переключение экранов
        function switchScreen(screenId) {
            currentScreen = screenId;
            document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
            
            const targetScreen = document.getElementById(`screen-${screenId}`);
            if (targetScreen) targetScreen.classList.add('active');

            updateHeader();
            updateNavColors();
        }

        // Обновление шапки
        function updateHeader() {
            const titleEl = document.getElementById('headerTitle');
            const iconEl = document.getElementById('headerRightIcon');
            
            titleEl.innerText = "";
            iconEl.innerHTML = "";

            if (currentScreen === 'home') {
                let heartColor = "#00FF00";
                if (currentBpm === 90) heartColor = "#FFA500";
                if (currentBpm === 120) heartColor = "#FF0000";
                iconEl.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="${heartColor}"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
            } 
            else if (currentScreen === 'music') {
                titleEl.innerText = "Любимая музыка";
                iconEl.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>`;
            } 
            else if (currentScreen === 'settings') {
                titleEl.innerText = "Настройки";
                iconEl.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>`;
            } 
            else if (currentScreen === 'profile') {
                titleEl.innerText = "user";
            }
        }

        // Клик по иконке профиля в настройках переводит на экран профиля
        function handleHeaderIconClick() {
            if (currentScreen === 'settings') {
                switchScreen('profile');
            }
        }

        // Подсветка кнопок навигации
        function updateNavColors() {
            const navHome = document.getElementById('nav-icon-home');
            const navMusic = document.getElementById('nav-icon-music');
            const navSettings = document.getElementById('nav-icon-settings');

            [navHome, navMusic, navSettings].forEach(icon => {
                if(icon) {
                    icon.style.fill = '#fff';
                    icon.classList.remove('dynamic-fill');
                }
            });

            if (currentScreen === 'home' && navHome) {
                navHome.classList.add('dynamic-fill');
            } else if (currentScreen === 'music' && navMusic) {
                navMusic.classList.add('dynamic-fill');
            } else if ((currentScreen === 'settings' || currentScreen === 'profile') && navSettings) {
                navSettings.classList.add('dynamic-fill');
            }
        }

        // Переключатель отображения пульса в настройках
        function togglePulseState() {
            updateBpmUI(currentBpm);
        }

        // Старт приложения
        window.onload = function() {
            initAgeSelect();     // Инициализируем кастомный выбор возраста
            setPulseState(78);   // Ставим начальный пульс
            
            updateClock();       // Сразу выставляем текущее время
            setInterval(updateClock, 1000); // Обновляем время каждую секунду
        };
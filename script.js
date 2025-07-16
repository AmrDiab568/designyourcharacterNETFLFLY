document.addEventListener('DOMContentLoaded', function() {
    // تغيير قطع الشخصية
    document.querySelectorAll('.option-btn').forEach(button => {
        button.addEventListener('click', function() {
            const partType = this.parentElement.getAttribute('data-part');
            const partValue = this.getAttribute('data-value');
            const imagePath = `assets/characters/assistant/${partType}/${partValue}.png`;
            
            // تحديث الصورة مع تأثير
            const imgElement = document.getElementById(`${partType}-layer`);
            imgElement.style.opacity = 0;
            
            setTimeout(() => {
                imgElement.src = imagePath;
                imgElement.style.opacity = 1;
            }, 200);
            
            // إضافة تأثير التحديد
            document.querySelectorAll(`.options-grid[data-part="${partType}"] .option-btn`).forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // زر الشخصية العشوائية
    document.getElementById('random-btn').addEventListener('click', function() {
        this.classList.add('animating');
        
        let counter = 0;
        const randomizeInterval = setInterval(() => {
            document.querySelectorAll('.options-grid').forEach(container => {
                const buttons = container.querySelectorAll('.option-btn');
                const randomButton = buttons[Math.floor(Math.random() * buttons.length)];
                randomButton.click();
            });
            
            if (counter++ > 8) {
                clearInterval(randomizeInterval);
                this.classList.remove('animating');
            }
        }, 150);
    });

    // زر التنزيل
    document.getElementById('download-btn').addEventListener('click', async function() {
        const btn = this;
        const originalContent = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing...';
        btn.disabled = true;
        
        try {
            const canvas = await html2canvas(document.querySelector('.character-display'), {
                backgroundColor: null,
                scale: 2 // لجودة أعلى
            });
            
            const link = document.createElement('a');
            link.download = `character-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (error) {
            console.error('Error generating image:', error);
            alert('Error occurred while generating image. Please try again.');
        } finally {
            btn.innerHTML = originalContent;
            btn.disabled = false;
        }
    });

    // زر إعادة الضبط
    document.getElementById('reset-btn').addEventListener('click', function() {
        document.querySelectorAll('.options-grid').forEach(container => {
            const firstButton = container.querySelector('.option-btn');
            if (firstButton) firstButton.click();
        });
    });

    // تحديد الخيارات الافتراضية عند التحميل
    setTimeout(() => {
        document.querySelectorAll('.options-grid').forEach(container => {
            const firstButton = container.querySelector('.option-btn');
            if (firstButton) firstButton.click();
        });
    }, 500);
});
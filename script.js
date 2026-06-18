// AOU Hargeisa Branch – Global JS

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Hamburger mobile nav toggle ---- */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNav = document.getElementById('mobileNav');

  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
  }

  /* ---- Student credentials ---- */
  const STUDENTS = {
    'AOU-001': { password: 'Ahmed@2026',  name: 'Ahmed Hassan Mohamud',  program: 'B. Islamic Studies',     level: 'Bachelor', gpa: '3.8', credits: '45', balance: '$0',    status: 'Good Standing' },
    'AOU-002': { password: 'Fadumo@2026', name: 'Fadumo Ali Jama',        program: 'M. Islamic Studies',     level: 'Master',   gpa: '3.5', credits: '30', balance: '$260', status: 'Good Standing' },
    'AOU-003': { password: 'Mohamed@2026',name: 'Mohamed Yusuf Aden',     program: 'Ph.D. Islamic Finance',  level: 'PhD',      gpa: '3.9', credits: '60', balance: '$0',    status: 'Good Standing' },
    'AOU-004': { password: 'Amina@2026',  name: 'Amina Warsame Hashi',    program: 'B. Islamic Psychology',  level: 'Bachelor', gpa: '3.7', credits: '45', balance: '$0',    status: 'Good Standing' },
    'AOU-005': { password: 'Abdi@2026',   name: 'Abdi Noor Ibrahim',      program: 'B. Islamic Studies',     level: 'Bachelor', gpa: '2.9', credits: '30', balance: '$130', status: 'Academic Probation' },
    'AOU-006': { password: 'Hodan@2026',  name: 'Hodan Omar Elmi',        program: "Qur'an Hifz Program",    level: 'Bachelor', gpa: '4.0', credits: '15', balance: '$0',    status: 'Good Standing' },
    'AOU-007': { password: 'Sahra@2026',  name: 'Sahra Mohamed Duale',    program: 'M. Arabic Language',     level: 'Master',   gpa: '3.6', credits: '45', balance: '$0',    status: 'Good Standing' },
    'AOU-008': { password: 'Yusuf@2026',  name: 'Yusuf Abdullahi Farah',  program: 'B. Islamic Studies',     level: 'Bachelor', gpa: '3.2', credits: '30', balance: '$130', status: 'Suspended', role: 'Student' },
    'AOU-009': { password: 'Faysal@2026', name: 'Faysal Hassan Guure',    program: 'Ph.D. Islamic Studies',  level: 'PhD',      gpa: '3.4', credits: '60', balance: '$0',    status: 'Good Standing', role: 'Student' },
    'AOU-010': { password: 'Nasra@2026',  name: 'Nasra Ahmed Ismail',     program: 'B. Islamic Studies',     level: 'Bachelor', gpa: '3.7', credits: '75', balance: '$130', status: 'Good Standing', role: 'Student' },
    'APP-001': { password: 'Applicant@2026', name: 'Jama Ali Jama',       program: 'Pending Enrollment',     level: 'Bachelor', gpa: 'N/A', credits: '0', balance: '$0', status: 'Pending Documents', role: 'Applicant' },
  };

  /* ---- Login form ---- */
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id  = document.getElementById('studentId').value.trim().toUpperCase();
      const pw  = document.getElementById('password').value.trim();
      const errorEl = document.getElementById('loginError');

      const student = STUDENTS[id];
      if (student && student.password === pw) {
        localStorage.setItem('aou_logged_in',       'true');
        localStorage.setItem('aou_student_id',       id);
        localStorage.setItem('aou_student_name',     student.name);
        localStorage.setItem('aou_student_program',  student.program);
        localStorage.setItem('aou_student_gpa',      student.gpa);
        localStorage.setItem('aou_student_credits',  student.credits);
        localStorage.setItem('aou_student_balance',  student.balance);
        localStorage.setItem('aou_student_status',   student.status);
        localStorage.setItem('aou_student_role',     student.role || 'Student');
        
        // If an applicant logged in and we saved their specific level during apply, use it. Otherwise use the mock data level.
        if (student.role === 'Applicant' && localStorage.getItem('aou_pending_applicant_level')) {
          localStorage.setItem('aou_student_level', localStorage.getItem('aou_pending_applicant_level'));
        } else {
          localStorage.setItem('aou_student_level', student.level || 'Bachelor');
        }
        
        if (student.role === 'Applicant') {
          window.location.href = 'pre-student-dashboard.html';
        } else {
          window.location.href = 'dashboard.html';
        }
      } else {
        if (errorEl) errorEl.style.display = 'block';
      }
    });

    // Hide error on new input
    ['studentId', 'password'].forEach(field => {
      const el = document.getElementById(field);
      if (el) {
        el.addEventListener('input', () => {
          const errorEl = document.getElementById('loginError');
          if (errorEl) errorEl.style.display = 'none';
        });
      }
    });
  }


  /* ---- Populate student name on dashboard ---- */
  const studentNameEl = document.getElementById('studentName');
  if (studentNameEl) {
    const storedName = localStorage.getItem('aou_student_name');
    if (storedName) studentNameEl.textContent = storedName;
  }

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    link.addEventListener('click', (e) => {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (mobileNav) mobileNav.classList.remove('open');
      }
    });
  });

  /* ---- Active nav highlighting based on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a');

  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + entry.target.id) {
              link.classList.add('active');
            }
          });
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(s => observer.observe(s));
  }
});

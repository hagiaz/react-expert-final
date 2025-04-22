describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });
 
  it('should display login page correctly', () => {
    // memverifikasi elemen yang harus tampak pada halaman login
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').contains(/^Login$/).should('be.visible');
    cy.get('h1').contains('Login').should('be.visible');
    cy.contains('Belum punya akun?').should('be.visible');
    cy.contains('Daftar di sini').should('be.visible');
  });
 
  it('should display validation message when email is empty', () => {
    // Mengisi password tanpa email
    cy.get('input[type="password"]').type('password123');
    
    // Klik tombol login
    cy.get('button[type="submit"]').click();
    
    // Memverifikasi input email menampilkan pesan validasi (HTML5 validation)
    cy.get('input[type="email"]:invalid').should('exist');
  });

  it('should display validation message when password is empty', () => {
    // Mengisi email tanpa password
    cy.get('input[type="email"]').type('test@example.com');
    
    // Klik tombol login
    cy.get('button[type="submit"]').click();
    
    // Memverifikasi input password menampilkan pesan validasi (HTML5 validation)
    cy.get('input[type="password"]:invalid').should('exist');
  });

  it('should display error message when credentials are wrong', () => {
    // Mengisi email
    cy.get('input[type="email"]').type('wrong@example.com');
 
    // Mengisi password yang salah
    cy.get('input[type="password"]').type('wrong_password');
 
    // Menekan tombol Login
    cy.get('button[type="submit"]').click();
 
    // Memverifikasi pesan error ditampilkan
    cy.get('.sc-lixPIL').should('be.visible');
    cy.get('.sc-lixPIL').should('contain', 'email or password is wrong');
  });

  it('should display loading state when submitting form', () => {
    // Mengisi email
    cy.get('input[type="email"]').type('test@example.com');
 
    // Mengisi password
    cy.get('input[type="password"]').type('password123');
 
    // Menekan tombol Login
    cy.get('button[type="submit"]').click();
 
    // Memverifikasi tombol login menampilkan teks "Loading..."
    cy.get('button[type="submit"]').should('contain', 'Loading...');
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('should navigate to homepage when login is successful', () => {
    // Mengisi email dengan kredensial yang benar
    cy.get('input[type="email"]').type('Hagiazzam@outlook.com');
 
    // Mengisi password dengan kredensial yang benar
    cy.get('input[type="password"]').type('PxhiT4KMq7JZPjg');
 
    // Menekan tombol Login
    cy.get('button[type="submit"]').click();
 
    // Memverifikasi bahwa pengguna dialihkan ke homepage
    cy.url().should('eq', 'http://localhost:5173/');
    
    // Memverifikasi elemen-elemen di homepage
    cy.get('.sc-Qotzb').should('exist');
    cy.get('.thread-list').should('exist');
  });

  it('should navigate to register page when clicking register link', () => {
    // Klik link "Daftar di sini"
    cy.contains('Daftar di sini').click();
    
    // Memverifikasi URL berubah ke halaman register
    cy.url().should('include', '/register');
    
    // Memverifikasi halaman register tampil dengan benar
    cy.get('h1').contains('Register').should('be.visible');
  });
});
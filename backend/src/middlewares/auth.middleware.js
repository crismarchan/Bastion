// Middleware que simula la verificación de roles leyendo un Header directo
export function isAdmin(req, res, next) {
  // Leemos el rol desde una cabecera personalizada que mandará el cliente
  const userRole = req.headers['x-user-role'];

  if (userRole === 'admin') {
    next(); // Si viene como 'admin', puede pasar
  } else {
    // Si viene como 'user', cualquier otra cosa o no viene nada, rebota
    res.status(403).json({ 
      error: 'Acceso prohibido. Se requieren permisos de Administrador.' 
    });
  }
}
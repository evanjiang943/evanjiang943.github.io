#!/usr/bin/env python3
"""
Simple HTTP server with cache-busting headers for local development
"""
import http.server
import socketserver
from http.server import SimpleHTTPRequestHandler

class NoCacheHTTPRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add cache-busting headers
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

if __name__ == "__main__":
    PORT = 8001
    Handler = NoCacheHTTPRequestHandler
    
    # Allow port reuse
    socketserver.TCPServer.allow_reuse_address = True
    
    with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
        print(f"Server running at http://0.0.0.0:{PORT}")
        print(f"Mobile access: http://10.250.161.205:{PORT}")
        print("Cache-busting headers enabled - no caching issues!")
        httpd.serve_forever()

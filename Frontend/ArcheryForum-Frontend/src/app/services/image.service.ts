import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class imageService {
    imageToSvg(imageFile: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                const base64Image = event.target?.result;
                if (typeof base64Image === 'string') {
                    const svgString = `
                        <svg xmlns="http://www.w3.org/2000/svg" height="auto" width="auto">
                            <image href="${base64Image}"/>
                        </svg>
                    `;
                    resolve(svgString);
                } else {
                    reject('Error reading file');
                }
            };

            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(imageFile);
        });
    }

    imageUrlToSvg(imageUrl: string): string {
        const svgString = `
            <svg xmlns="http://www.w3.org/2000/svg" height="auto" width="auto">
                <image href="${imageUrl}"/>
            </svg>
        `;
        return svgString;
    }
}

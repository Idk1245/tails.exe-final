precision mediump float;

uniform sampler2D bitmap;

const float amount = 2.0;

// GAUSSIAN BLUR SETTINGS
float dim = 1.8;
float Directions = 16.0;
float Quality = 8.0;
float Size = 8.0;

vec2 Radius = Size / vec2(textureSize(bitmap, 0));

void main(void)
{
    vec2 uv = gl_FragCoord.xy / vec2(textureSize(bitmap, 0));
    vec2 pixel = uv * vec2(textureSize(bitmap, 0));
    float Pi = 3.14159265359; // Pi
    vec4 Color = texture2D(bitmap, uv);

    for (float d = 0.0; d < Pi; d += Pi / Directions)
    {
        for (float i = 1.0 / Quality; i <= 1.0; i += 1.0 / Quality)
        {
            float ex = (cos(d) * Size * i) / float(textureSize(bitmap, 0).x);
            float why = (sin(d) * Size * i) / float(textureSize(bitmap, 0).y);
            Color += texture2D(bitmap, uv + vec2(ex, why));
        }
    }

    Color /= (dim * Quality) * Directions - 15.0;
    vec4 bloom = (texture2D(bitmap, uv) / dim) + Color;
    gl_FragColor = bloom;
}

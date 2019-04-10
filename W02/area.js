<script src="vec3.js"></script>

funtion AreaOfTriangle(v0, v1, v2)
{
    v0.sub(v2);
    v1.sub(v2);
    return 0.5 * Math.sqrt(Math.pow(v0.y * v1.z - v0.z * v1.y)
    + Math.pow(v0.z * v1.x - v0.x * v1.z) + Math.pow(v0.x * v1.y - v0.y * v1.x))
}

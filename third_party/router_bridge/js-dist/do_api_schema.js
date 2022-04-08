var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const result = bridge.apiSchema(sdl);
if (((_a = result.errors) === null || _a === void 0 ? void 0 : _a.length) > 0) {
    done({ Err: result.errors });
}
else {
    done({ Ok: result.data });
}
//# sourceMappingURL=do_api_schema.js.map
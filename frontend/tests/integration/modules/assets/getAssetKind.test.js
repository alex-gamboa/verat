const Subject = require('../../../../modules/usecases/asset/getAssetKinds')

describe('execute', () => {
    it('should return an array of kinds if category exists', async () => {
        const result = await Subject.execute('Computo')
        expect(Array.isArray(result)).toBe(true)
        expect(result.length).toBeGreaterThan(0)
    })

    it('should return an empty array if category dont exists', async () => {
        const result = await Subject.execute('invalidCategory')
        expect(Array.isArray(result)).toBe(true)
        expect(result.length).toBe(0)
    })

    it('should return an array if is called without category', async () => {
        const result = await Subject.execute()
        expect(Array.isArray(result)).toBe(true)
        expect(result.length).toBeGreaterThan(0)
    })
})

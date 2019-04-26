module.exports = {
    barCalculator: function (max, inHit) {

        return ((max - inHit) / max) * 100
    },

    generateHit: function (weapon, totalWeapons, hitTypes) {
        let diminisher = totalWeapons * 10
        if (diminisher > 60) diminisher = 60

        let stealth  = 1
        let power  = 1
        let dd = 0
        
        if (hitTypes === 'power') power = 3
        
        if (hitTypes === 'stealth') {stealth = 1.3}
        

        let firstAdd = (weapon.power * power) * ((weapon.mastery * stealth) / 100)
        let subtractor = (weapon.power  * (diminisher / 100)) 
        let hit = ~~(weapon.power * 0.2 + firstAdd - subtractor)
        let hitMiss = subtractor / firstAdd
        let msg = ``
        hit = (hit < 0) ? 1 : hit

        if (hitMiss > 0.9)
            msg = `your ${weapon.name} scores a critical the target, your ${hitTypes} attack hit with ${hit} damage  `
        else if (hitMiss > 0.7)
            msg = `your ${weapon.name} hits the target perfectly the target, your ${hitTypes} attack hit with ${hit} damage `
        else if (hitMiss > 0.5)
            msg = `your ${weapon.name} hits the target the target, your ${hitTypes} attack hit with  ${hit} damage`
        else if (hitMiss > 0.2)
            msg = `your ${weapon.name} grazes the target, your ${hitTypes} attack hit with ${hit} damage`
        else if (hitMiss > 0)
            msg = `your ${weapon.name} almost misses the target, your ${hitTypes} attack hit target with ${hit} damage`
        else
            msg = `your ${weapon.name} misses the target the target, your ${hitTypes} attack hit with ${hit} damage`

        return { hit, msg }
    }
}
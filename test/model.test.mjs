import test from 'node:test';
import assert from 'node:assert/strict';
import {analyze} from '../src/model.mjs';

test('known mean and missingness',()=>{const r=analyze({daily:[10,null,20],expectedDays:3});assert.equal(r.meanUgM3,15);assert.equal(r.coverage,2/3);assert.equal(r.daysAbove15,1);});
test('constant sample has zero bootstrap width',()=>assert.deepEqual(analyze({daily:[7,7,7],expectedDays:3}).bootstrap95,[7,7]));
test('bootstrap is reproducible',()=>{const x={daily:[1,9,40],expectedDays:3,seed:7};assert.deepEqual(analyze(x),analyze(x));});
test('invalid and empty inputs rejected',()=>{for(const x of [{daily:[-1,3],expectedDays:2},{daily:[null,null],expectedDays:2},{daily:[2,3],expectedDays:4},{daily:[2,Infinity],expectedDays:2}])assert.throws(()=>analyze(x));});
/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UpdateCharacterButtonFragment = {
    readonly id: string;
    readonly characters: ReadonlyArray<{
        readonly id: string;
    }>;
    readonly " $refType": "UpdateCharacterButtonFragment";
};
export type UpdateCharacterButtonFragment$data = UpdateCharacterButtonFragment;
export type UpdateCharacterButtonFragment$key = {
    readonly " $data"?: UpdateCharacterButtonFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"UpdateCharacterButtonFragment">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UpdateCharacterButtonFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Character",
      "kind": "LinkedField",
      "name": "characters",
      "plural": true,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
})();
(node as any).hash = '1660c4ad3a45b27c61077ff7107034b8';
export default node;

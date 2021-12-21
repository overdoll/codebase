/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UpdateAudienceButton = {
    readonly id: string;
    readonly audience: {
        readonly id: string;
    } | null;
    readonly " $refType": "UpdateAudienceButton";
};
export type UpdateAudienceButton$data = UpdateAudienceButton;
export type UpdateAudienceButton$key = {
    readonly " $data"?: UpdateAudienceButton$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"UpdateAudienceButton">;
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
  "name": "UpdateAudienceButton",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Audience",
      "kind": "LinkedField",
      "name": "audience",
      "plural": false,
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
(node as any).hash = '4f9b52dff2eb897912cf1fef4c606719';
export default node;

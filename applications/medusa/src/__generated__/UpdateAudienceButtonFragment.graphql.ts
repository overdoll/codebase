/**
 * @generated SignedSource<<7ae79e8e453cb2f10c915d5f8db9cb6f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdateAudienceButtonFragment$data = {
  readonly audience: {
    readonly id: string;
  } | null;
  readonly id: string;
  readonly " $fragmentType": "UpdateAudienceButtonFragment";
};
export type UpdateAudienceButtonFragment$key = {
  readonly " $data"?: UpdateAudienceButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UpdateAudienceButtonFragment">;
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
  "name": "UpdateAudienceButtonFragment",
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

(node as any).hash = "101334f5d215318483ed40da4651b7a9";

export default node;

/**
 * @generated SignedSource<<c8c6b10221b795f157b79eb291dfe217>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchCharacterCopyLinkButtonFragment$data = {
  readonly series: {
    readonly slug: string;
  };
  readonly slug: string;
  readonly " $fragmentType": "SearchCharacterCopyLinkButtonFragment";
};
export type SearchCharacterCopyLinkButtonFragment$key = {
  readonly " $data"?: SearchCharacterCopyLinkButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SearchCharacterCopyLinkButtonFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SearchCharacterCopyLinkButtonFragment",
  "selections": [
    (v0/*: any*/),
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "concreteType": "Series",
        "kind": "LinkedField",
        "name": "series",
        "plural": false,
        "selections": [
          (v0/*: any*/)
        ],
        "storageKey": null
      },
      "action": "THROW",
      "path": "series"
    }
  ],
  "type": "Character",
  "abstractKey": null
};
})();

(node as any).hash = "9210d8931b8dd4b6c96f11cc2a24430d";

export default node;

/**
 * @generated SignedSource<<8fc94eb40f5254e3c596e7a52fc4303d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostContentPreviewFragment$data = {
  readonly id: string;
  readonly isSupporterOnly: boolean;
  readonly resource: {
    readonly failed: boolean;
    readonly id: string;
  };
  readonly " $fragmentSpreads": FragmentRefs<"ExpandableResourceInfoFragment" | "PostContentPreviewMenuFragment" | "RemovePostContentButtonFragment" | "SupporterPostContentButtonFragment">;
  readonly " $fragmentType": "PostContentPreviewFragment";
};
export type PostContentPreviewFragment$key = {
  readonly " $data"?: PostContentPreviewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostContentPreviewFragment">;
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
  "name": "PostContentPreviewFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isSupporterOnly",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "resource",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "failed",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostContentPreviewMenuFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RemovePostContentButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SupporterPostContentButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ExpandableResourceInfoFragment"
    }
  ],
  "type": "PostContent",
  "abstractKey": null
};
})();

(node as any).hash = "ae8774753882c652c171d33f569a6772";

export default node;

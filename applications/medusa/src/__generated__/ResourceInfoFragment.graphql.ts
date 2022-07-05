/**
 * @generated SignedSource<<41af69ef63f159a04494952d8a6f9a4b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ResourceInfoFragment$data = {
  readonly id: string;
  readonly isSupporterOnly: boolean;
  readonly resource: {
    readonly processed: boolean;
    readonly type: ResourceType;
    readonly videoDuration: number;
    readonly " $fragmentSpreads": FragmentRefs<"ResourceItemFragment">;
  };
  readonly supporterOnlyResource: {
    readonly type: ResourceType;
    readonly videoDuration: number;
  } | null;
  readonly " $fragmentType": "ResourceInfoFragment";
};
export type ResourceInfoFragment$key = {
  readonly " $data"?: ResourceInfoFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ResourceInfoFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "videoDuration",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ResourceInfoFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
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
          "name": "processed",
          "storageKey": null
        },
        (v1/*: any*/),
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ResourceItemFragment"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "supporterOnlyResource",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "PostContent",
  "abstractKey": null
};
})();

(node as any).hash = "c411cec72768f94d461c2038cc763c07";

export default node;

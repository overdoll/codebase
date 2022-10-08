/**
 * @generated SignedSource<<b3b9140c70005763ca6c7ff1f706fd9e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PreviewGridImageMediaFragment$data = {
  readonly variants: {
    readonly banner: {
      readonly height: number;
      readonly url: string;
      readonly width: number;
    };
    readonly smallBanner: {
      readonly height: number;
      readonly url: string;
      readonly width: number;
    };
  };
  readonly " $fragmentType": "PreviewGridImageMediaFragment";
};
export type PreviewGridImageMediaFragment$key = {
  readonly " $data"?: PreviewGridImageMediaFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PreviewGridImageMediaFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "url",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "width",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "height",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PreviewGridImageMediaFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ImageMediaVariants",
      "kind": "LinkedField",
      "name": "variants",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ImageMediaAccess",
          "kind": "LinkedField",
          "name": "banner",
          "plural": false,
          "selections": (v0/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "ImageMediaAccess",
          "kind": "LinkedField",
          "name": "smallBanner",
          "plural": false,
          "selections": (v0/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ImageMedia",
  "abstractKey": null
};
})();

(node as any).hash = "3c8d4d0b7fb5be1c806f64972a15b0a0";

export default node;

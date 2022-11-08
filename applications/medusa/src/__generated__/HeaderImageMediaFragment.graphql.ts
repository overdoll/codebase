/**
 * @generated SignedSource<<fcc30d012dd910fbca672216db605525>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HeaderImageMediaFragment$data = {
  readonly colorPalettes: ReadonlyArray<{
    readonly blue: number;
    readonly green: number;
    readonly red: number;
  }>;
  readonly variants: {
    readonly large: {
      readonly height: number;
      readonly url: string;
      readonly width: number;
    };
    readonly medium: {
      readonly height: number;
      readonly url: string;
      readonly width: number;
    };
    readonly small: {
      readonly height: number;
      readonly url: string;
      readonly width: number;
    };
  };
  readonly " $fragmentSpreads": FragmentRefs<"BackgroundPosterImageMediaFragment" | "HdImageMediaFragment">;
  readonly " $fragmentType": "HeaderImageMediaFragment";
};
export type HeaderImageMediaFragment$key = {
  readonly " $data"?: HeaderImageMediaFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"HeaderImageMediaFragment">;
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
  "name": "HeaderImageMediaFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ColorPalette",
      "kind": "LinkedField",
      "name": "colorPalettes",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "red",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "green",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "blue",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
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
          "name": "small",
          "plural": false,
          "selections": (v0/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "ImageMediaAccess",
          "kind": "LinkedField",
          "name": "medium",
          "plural": false,
          "selections": (v0/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "ImageMediaAccess",
          "kind": "LinkedField",
          "name": "large",
          "plural": false,
          "selections": (v0/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BackgroundPosterImageMediaFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "HdImageMediaFragment"
    }
  ],
  "type": "ImageMedia",
  "abstractKey": null
};
})();

(node as any).hash = "cb3682618b64fdadfb43e37b74445813";

export default node;

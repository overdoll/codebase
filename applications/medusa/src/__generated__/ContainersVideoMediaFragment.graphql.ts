/**
 * @generated SignedSource<<b60789a8ba5e1d97af05e170f7c514dc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainersVideoMediaFragment$data = {
  readonly aspectRatio: {
    readonly height: number;
    readonly width: number;
  };
  readonly containers: ReadonlyArray<{
    readonly __typename: "HLSVideoContainer";
    readonly url: string;
  } | {
    readonly __typename: "MP4VideoContainer";
    readonly url: string;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  }>;
  readonly duration: number;
  readonly hasAudio: boolean;
  readonly " $fragmentType": "ContainersVideoMediaFragment";
};
export type ContainersVideoMediaFragment$key = {
  readonly " $data"?: ContainersVideoMediaFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainersVideoMediaFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "url",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainersVideoMediaFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "AspectRatio",
      "kind": "LinkedField",
      "name": "aspectRatio",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "height",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "width",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "duration",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasAudio",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "containers",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": (v0/*: any*/),
          "type": "HLSVideoContainer",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": (v0/*: any*/),
          "type": "MP4VideoContainer",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "VideoMedia",
  "abstractKey": null
};
})();

(node as any).hash = "d5f37c2e7193e0cfc1460cdfac05a13b";

export default node;

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
export type DraggableContentFragment = {
    readonly id: string;
    readonly type: ResourceType;
    readonly urls: ReadonlyArray<{
        readonly url: unknown;
        readonly mimeType: string;
    }>;
    readonly " $fragmentRefs": FragmentRefs<"ResourceItemFragment">;
    readonly " $refType": "DraggableContentFragment";
};
export type DraggableContentFragment$data = DraggableContentFragment;
export type DraggableContentFragment$key = {
    readonly " $data"?: DraggableContentFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"DraggableContentFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DraggableContentFragment",
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
      "name": "type",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ResourceUrl",
      "kind": "LinkedField",
      "name": "urls",
      "plural": true,
      "selections": [
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
          "name": "mimeType",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ResourceItemFragment"
    }
  ],
  "type": "Resource",
  "abstractKey": null
};
(node as any).hash = '3ec2210c98b7e5b443a31d689e9743b2';
export default node;
